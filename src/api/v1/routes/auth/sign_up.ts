import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

// import third party package
import { eq } from "drizzle-orm";

// import db and schema
import { db } from "@/db";
import { customers } from "@/db/schema";

// import validation schema
import { customerSchema } from "@/utils/validation";

// import fetch for making HTTP requests
import fetch from "node-fetch";

const sign_up = new Hono();

sign_up.post("/customer", zValidator("json", customerSchema), async (c) => {
  try {
    const payload = c.req.valid("json");

    const isUserExist = await db.query.customers.findFirst({
      where: eq(customers.phone, payload.phone),
    });

    // If user already exists
    if (isUserExist && isUserExist.email === payload.email) {
      return c.json(
        {
          success: true,
          message: "Customer already exists.",
          data: {
            id: isUserExist.id,
          },
        },
        200
      );
    }

    const dobDate = new Date(payload.dob);

    const dbPayload = {
      ...payload,
      dob: dobDate,
    };

    const result = await db.insert(customers).values(dbPayload).returning();

    const googleSheetURL =
      "https://script.google.com/macros/s/AKfycbyXWRNvF2LRXPWHDibnBd_tkjycp_Ezy-ZOVbNp34hMbsAgTkc-nNtHMME-VNIfkFDA6g/exec";

    // update data in google sheet
    const sheetResponse = await fetch(googleSheetURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        user_name: payload.user_name,
        email: payload.email,
        dob: payload.dob,
        phone: payload.phone,
      }),
    });

    const sheetResponseText = await sheetResponse.text();

    if (sheetResponseText !== "Success") {
      console.warn("Google Sheets update failed:", sheetResponseText);
    }

    return c.json(
      {
        success: true,
        message: "Customer create successful!",
        data: {
          id: result[0].id,
        },
      },
      201
    );
  } catch (error) {
    console.error("Error during customer:", error);
    return c.json({ error: "Customer create failed, please try again." }, 500);
  }
});

export default sign_up;

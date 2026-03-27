import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const filePath = path.join(process.cwd(), "bookings.json");

    let existing = [];

    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath, "utf-8");
      existing = JSON.parse(file || "[]");
    }

    existing.push({
      ...data,
      status: "NEW",
      payment: "UNPAID",
      createdAt: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed" }), {
      status: 500,
    });
  }
}
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "bookings.json");

    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file || "[]");

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
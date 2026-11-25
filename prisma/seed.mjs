import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const email = process.env.ADMIN_EMAIL || "admin@saujiyan.example";
const password = process.env.ADMIN_PASSWORD || "SaujiyanAdmin2026";

const existing = await prisma.admin.findUnique({ where: { email } });
if (!existing) {
  await prisma.admin.create({
    data: { email, passwordHash: await bcrypt.hash(password, 12) },
  });
  console.log(`Admin ready: ${email}`);
} else {
  console.log(`Admin already exists: ${email}`);
}

await prisma.$disconnect();

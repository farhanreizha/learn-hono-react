import { prisma } from "@/config/database";

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      name: "Admin",
      username: "admin",
      password: Bun.password.hashSync("adminajalah", {
        algorithm: "bcrypt",
        cost: 12,
      }),
    },
  });

  console.log("Database seeded successfully!");

  process.exit();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

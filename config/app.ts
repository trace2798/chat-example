
export const app = {
  name: "Reference App",
  description:
    "Ably reference app built with Next.js, TypeScript, Radix UI, Tailwind CSS, and Prisma.",
  mainNav: [
    {
      title: "Home",
      href: "/home",
    },
  ]
}

export type AppConfig = typeof app;

export default app;

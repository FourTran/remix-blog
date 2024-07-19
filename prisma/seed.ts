import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
const db = new PrismaClient();

async function seed() {
  const four = await db.user.create({
    data: {
      name: "four Tran",
      userName: "four",
      // this is a hashed version of "twixrox"
      password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });
  await Promise.all(
    getPosts().map((post: any) => {
      let slug = slugify(post.title);
      let now = new Date().toLocaleDateString("en-CA");
      let summary = post.content.slice(0, 150);
      const data = {
        slug: slug,
        userId: four.id.toString(),
        formattedDate: now,
        summary: summary,
        ...post,
      };

      return db.article.create({ data });
    })
  );
}

seed();

function getPosts() {
  return [
    {
      title: "His mother had always taught him",
      content:
        "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
      tags: ["history", "american", "crime"],
    },
    {
      title: "He was an expert but not in a discipline",
      content:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
      tags: ["french", "fiction", "english"],
    },
    {
      title: "Dave watched as the forest burned up on the hill.",
      content:
        "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
      tags: ["magical", "history", "french"],
    },
    {
      title: "All he wanted was a candy bar.",
      content:
        "All he wanted was a candy bar. It didn't seem like a difficult request to comprehend, but the clerk remained frozen and didn't seem to want to honor the request. It might have had something to do with the gun pointed at his face.",
      tags: ["mystery", "english", "american"],
    },
    {
      title: "Hopes and dreams were dashed that day.",
      content:
        "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.",
      tags: ["crime", "mystery", "love"],
    },
  ];
}

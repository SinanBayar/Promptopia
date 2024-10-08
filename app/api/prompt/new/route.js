import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { prompt, tag, userId } = await req.json();

  try {
    await connectToDB();

    const newPrompt = Prompt.create({
      creator: userId,
      tag,
      prompt,
    });

    // const newPrompt = new Prompt({
    //   creator: userId,
    //   tag,
    //   prompt,
    // });
    // await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};

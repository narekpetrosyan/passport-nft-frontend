import z from "zod";

const formSchema = z.object({
  name: z
    .string({ message: "Please fill your name." })
    .min(1, { message: "Please fill your name." }),
  surname: z
    .string({ message: "Please fill your surname." })
    .min(1, { message: "Please fill your surname." }),
  age: z.coerce
    .number({ message: "Please fill your age." })
    .gt(0, { message: "Please fill your age." }),
  nationality: z
    .string({ message: "Please fill your nationality." })
    .min(1, { message: "Please fill your nationality." }),
  gender: z
    .string({ message: "Please fill your gender." })
    .min(1, { message: "Please fill your gender." }),
});

export default formSchema;

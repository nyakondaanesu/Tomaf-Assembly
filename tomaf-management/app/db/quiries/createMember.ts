import { db } from "..";
import { userCredentials } from "../schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function createUserCredentials(
  username: string,
  password: string,
  role: string
) {
  try {
    // Check if the username already exists
    const existingUsers = await db
      .select()
      .from(userCredentials)
      .where(eq(userCredentials.username, username))
      .limit(1)
      .execute();
    const existingUser = existingUsers[0];

    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    // Insert into the database
    const result = await db
      .insert(userCredentials)
      .values({
        username,
        password: hashedPassword,
        role: role, // default role
      })
      .returning();

    console.log(`User '${username}' added successfully.`);
    return result[0]; // return created user
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to create user credentials: ${error}`);
  }
}

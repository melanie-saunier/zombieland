// make-hash.js
import argon2 from "argon2";

const password = process.argv[2] || "P@ssword1234!";
const main = async () => {
  try {
    const hash = await argon2.hash(password);
    console.log(hash);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
main();

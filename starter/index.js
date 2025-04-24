const fs = require("fs");
const superAgent = require("superagent");

//promises readfile function
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

// readFilePro("./dog.txt")
//   .then((data) => {
//     return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     writeFilePro("./dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log(`Random dog image saved to file!`);
//   })
//   .catch((err) => {
//     throw new Error(err);
//   });
//promise writefile function
function writeFilePro(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve(`Image has been saved`);
    });
  });
}
//callbacks
// fs.readFile("./dog.txt", (err, data) => {
//   console.log(`Breed: ${data}`);
//   superAgent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) console.log(err);
//         console.log(`${data} dog image saved`);
//       });
//     })
//     .catch((err) => console.log(err));
// })
// async function
const getDogPic = async () => {
  try {
    const data = await readFilePro("./dog.txt");
    console.log(`Breed: `, data);
    const res1 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1, res2, res3]);

    const img = all.map((el) => el.body.message);
    await writeFilePro("./dog-img.txt", img.join("\n"));
    console.log(img);
  } catch (err) {
    throw new Error(err);
  }
  return "2: READY 😏";
};
console.log(`1:Will get dog Pics!`);
getDogPic().then((x) => {
  console.log(x);
  console.log(`2:Will get dog Pics!`);
});

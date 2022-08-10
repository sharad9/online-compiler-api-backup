const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
	fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath) => {
	const jobId = path.basename(filepath).split(".")[0];
	const outPath = path.join(outputPath, `${jobId}.out`);

	return new Promise((resolve, reject) => {
		exec(
			`javac -d ${outPath} ${filepath} && java -cp ${outPath} ${jobId}`,
			(error, stdout, stderr) => {
				error && reject({ error, stderr });
				stderr && reject(stderr);
				resolve(stdout);
			}
		);
	});
};

module.exports = {
	executeJava,
};

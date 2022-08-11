const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
	fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath) => {

	const jobId = path.basename(filepath).split(".")[0];
	const outPath = path.join(outputPath, `${jobId}`);

	return new Promise((resolve, reject) => {
		exec(
			`java ${filepath}`,
			//`javac -d ${outputPath} ${filepath} && java -cp ${outputPath} ${jobId}`,
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

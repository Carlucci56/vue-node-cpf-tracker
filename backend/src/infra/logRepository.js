const db = require("./firebase/firebase");

class LogRepository {
  constructor() {
    this.ref = db.ref("last_upload_log");
  }

  async insertLastUploadLog(userIp, cpfs, fileName) {
    const updatedAt = new Date().toISOString();

    const logData = {
      cpfs,
      fileName,
      userIp,
      updatedAt,
    };

    await this.ref.set(logData);
    return logData;
  }

  async getLastUpload() {
    const snapshot = await this.ref.once("value");
    return snapshot.val() || {};
  }
}

module.exports = LogRepository;

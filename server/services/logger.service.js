const { Log } = require("../models")

const getLogById = async(logId)=>{
    return await Log.findOne({isDeleted:false, _id:logId});
}

const getLogs = async(reqQuery, roleName)=>{
    return await Log.find({isDeleted:false});
}

const createLog = async(reqBody, userId)=>{
    const newLog = await Log.create({...reqBody});
    newLog.createdBy = userId;
    return newLog;
}


const updateLog = async(reqBody,logId, userId)=>{
    const isLog = await getLogById(logId);
    if(!isLog) throw new Error(`Could not find role with provided id ${logId}`);
    Object.keys(reqBody).forEach((key)=>{
        isLog[key] = reqBody[key];
    })
    isLog.updatedBy =userId;
    await isLog.save();
    return isLog;
}


const deleteLog = async(logId, userId)=>{
    const isLog = await getLogById(logId);
    if(!isLog) throw new Error(`Could not find role with provided id ${logId}`);
    isLog.isDeleted = true;
    isLog.deletedBy = userId;
    await isLog.save();
    return isLog;
}


module.exports = {
    createLog,
    updateLog,
    deleteLog,
    getLogById,
    getLogs
}
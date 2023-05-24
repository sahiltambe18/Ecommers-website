async function flashedData(req,data,action) {
    req.session.flashedData = data;
    await req.session.save(
        action()
    )
}

function getFlashedData(req) {
    const data = req.session.flashedData;
    req.session.flashedData = null
    return data;
}

module.exports = {
    flashedData,
    getFlashedData
}
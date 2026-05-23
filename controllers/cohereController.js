const getCohereResponse = require("../utils/generatePrompt");

const generateFromPrompt = async(req,res) => {
    try {
        const { prompt } = req.body;

        const prediction = await getCohereResponse(prompt);

        if(!prediction) {
            return res.status(500).json({
                message : "Generation unsuccessful",
            })
        }

        return res.status(200).json({
            message : "Generation successful",
            prediction
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message : "Error in generation",
            error : error.message
        })
    }
}

module.exports = { 
    generateFromPrompt
};
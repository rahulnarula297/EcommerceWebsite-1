module.exports.vendorPage = async function(req, res) {
    res.render('vendor');
}

module.exports.createProfile = async function(req, res) {
    try {
        
        if(req.xhr) {
            return res.status(200).json({
                data: {
                    info: req.body
                },
                message: "Profile Created"
            })
        }

        return res.redirect('back');

    } catch (error) {
        console.log('error : ',error);
        return res.redirect('back');
    }
}

module.exports.addtem = async function(req, res) {
    res.render('vendor_addItem');
}
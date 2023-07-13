const ProductModel = require("../models/ProductModel");



const add_product = (req, res) => {
    return res.render('admin/add_product');
}

const add_productData = async (req, res) => {
    try {
        const add = await ProductModel.create(req.body);
        if (add) {
            console.log("Product Add Successfully");
            return res.redirect("back");
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

const view_product = async (req, res) => {
    try {
        const data = await ProductModel.find({});
        return res.render("admin/view_product", { data });
     

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const view_data = async (req, res) => {
    try {
        const data = await ProductModel.find({});
        return res.render("home", { data });
     

    } catch (error) {
        console.log(error.message);
        return false;
    }
}
  
const DeleteData = async (req, res) => {
    try {
        let id = req.params.id;
        const Del = await ProductModel.findByIdAndDelete(id);
        if (Del) {
            console.log("product Delete Successfully");
            return res.redirect("back");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const EditData = async (req, res) => {
    try {
        let id = req.params.id;

        const upd = await ProductModel.findById(id);

        console.log(upd);

        return res.render("admin/edit_product", { upd });

    } catch (error) {
        console.log(error.message);
    }
}

const updateData = async (req, res) => {
    try {
        let id = req.params.id;
        const edits = await ProductModel.findByIdAndUpdate(id, req.body);
        if (edits) {
            return res.redirect("/admin/view_product");
        }

    } catch (error) {
        console.log(error.message);
    }
}

const active = async (req, res) => {
    try {
        let { id } = req.params;
        let values = 0;
        const Status = await ProductModel.findByIdAndUpdate(id, {
            status: values
        });
        return res.redirect("back");

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

const deactive = async (req, res) => {
    try {
        let { id } = req.params;
        let values = 1;
        const Status = await ProductModel.findByIdAndUpdate(id, {
            status: values
        });
        return res.redirect("back");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { add_product, add_productData, view_product,view_data, DeleteData, EditData, updateData, active, deactive }; 
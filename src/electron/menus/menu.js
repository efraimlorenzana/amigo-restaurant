const mealMenu = (Form, parent) => ({
    label: "Meals",
    submenu: [
        {
            label: "Add",
            click() {
                let x;
                Form(x, { width: 300, height: 200, frame: false, modal: true, alwaysOnTop: true, parent }, "/menu/add");
            }
        },
        {
            type: 'separator'
        },
        {   
            label: "Refresh List",
            role: 'reload'
        }
        
    ]
});

module.exports = {mealMenu};
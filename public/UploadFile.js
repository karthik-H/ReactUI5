

self.onmessage = (event) => {
    if (event && event.data.msg === "uploadImage") {
        debugger;
        const filesRef = event.data.file;
        const formType = event.data.type;
        const fieldName = event.data.fieldName;
        const entity = event.data.entity;
        const property = event.data.property;
        const domain = event.data.domain;
        let tempEntity = JSON.parse(JSON.stringify(entity));
        let form = new FormData();
        form.append("type", formType);
        //get id of current entity
        form.append("id", entity["id"]);
        Object.keys(filesRef).map((key) => {

            if (filesRef[key].size > 5048576) {
                self.postMessage({
                    msg: "Error",
                    errorMessage: `Maximum limit for Image File exceeded, File Name: ${filesRef[key].name}, Maximum File Size: 5MB`
                });
                close();
            } else {
                form.append("images", filesRef[key]);
                if (property.multiple === "true") {
                    if(!tempEntity[fieldName]) {
                        tempEntity[fieldName] = [];
                    }
                    tempEntity[fieldName].push(URL.createObjectURL(filesRef[key]));
                } else {
                    tempEntity[fieldName] = URL.createObjectURL(filesRef[key]);
                }
            }
        })
        fetch(`${domain}/admin/imageUpload`, {
            method: 'post',
            body: form
        }).then((response) => {
            response.json().then((data) => {
                self.postMessage({ msg: "success", tempEntity: tempEntity });
            })
        }).catch((error) => {
            self.postMessage({
                msg: "Error",
                errorMessage: errorMessage
            });
        })
    }
}
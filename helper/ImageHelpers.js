import * as Premissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"

export const openImageLibrary = async () => {
    const { status } = await Premissions.askAsync(Premissions.CAMERA)
    if (status !== 'granted') {
        alert('Sorry, we need camera roll permission to select an image')
        return false
    }
    else {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.all,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true
        })
        return !result.cancelled ? result : false
    }
}
export const openCamera = async () => {
    const { status } = await Premissions.askAsync(
        Premissions.CAMERA_ROLL,
        Premissions.CAMERA
    )
    if (status !== 'granted') {
        alert('Sorry, we need camera roll & camera permission to select an image')
        return false
    }
    else {
        const result = await ImagePicker.launchCameraAsync(
            {
                quality: 0.1,
                base64: true,
                allowsEditing: true,
                aspect: [4, 3]
            }
        )
        return result.cancelled ? result : false

    }
}


export const prepareBlob = async imageUri => {

    const blob = await new Promise((resolve, reject) => {
        const xml = new XMLHttpRequest()
        xml.onload = function () {
            console.log("preparing")
            resolve(xml.response)
        }
        xml.onerror = function (e) {
            console.log(e)
            reject(new TypeError('Image Upload failed'))
        }
        //set the response type to be blob image type
        xml.responseType = 'blob'
        xml.open('GET', imageUri, true)
        //set true async to true
        xml.send()
    })
    return blob
}
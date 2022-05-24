import * as yup from 'yup';
import "yup-phone";

 const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg"];
 const minPixelDimension = 70;
 const emailPatern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validationSchema = yup.object().shape({
  name: yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be not more than 60 characters')
    .required('Name is required'),
  email: yup.string()
    .required("Email is required")
    .matches(emailPatern, 'Email is not valid'),
  phone: yup.string()
    .required("Phone is required")
    .phone('UA', true, 'Phone is not valid'),
  position_id: yup.number()
    .required('Position is required'),
  photo: yup.mixed()
    .required('Photo is required')
    .test("fileSize", "The photo size must not be greater than 5 Mb", (value) => {
      return value && value.size <= 5242880
    })
     .test('fileType', "The photo format must be jpeg/jpg type",  value => {
      return value && SUPPORTED_FORMATS.includes(value.type) 
     })
     .test('fileDimensions', 'Minimum size of photo 70x70px', async value => {
       if (value) {
         const promise = new Promise((resolve) => {
           const img = new Image();
       
           img.onload = function () {
             return resolve({ width: this.width, height: this.height });
           };
           img.src = URL.createObjectURL(value);
         });
   
         const resolution = await promise;
   
          if (resolution.width < minPixelDimension || 
                resolution.height < minPixelDimension) {
            return false
          } else {
            return true
          }
       }
     })
  });

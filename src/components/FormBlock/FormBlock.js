import React, {useEffect, useState} from "react";
import { Formik, Form, Field } from 'formik';
import { getPositions , getToken, postUserData } from "../../api/index";
import { validationSchema } from "./ValidationSchema";
import { Element } from 'react-scroll';

import AfterSent from "../AfterSent/AfterSent";
import './FormBlock.scss';

const FormBlock = ({ submitUpdate }) => {
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState("");
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    getToken() 
      .then((response) => setToken(response))
      .catch((error) => console.log(error))

    getPositions() 
      .then((response) => setPositions(response))
      .catch((error) => console.log(error))
  }, []);

  const submitFormHandler = async (values, {resetForm}) => {
    const {name, email, phone, position_id} = values;
    const photo = values.photo;

    const formData = new FormData();
          formData.append("photo", photo)
          formData.append("name", name)
          formData.append("email", email)
          formData.append("phone", phone)
          formData.append("position_id", position_id);

      postUserData(formData, token)
        .then(response => {
          if(response.data?.success) {
            submitUpdate(); 
            setIsSent(true); 
            setTimeout(() => {
              resetForm();
              setIsSent(false);
            }, 3000);
          }
        })
        .catch(error => {
            console.log(error);
        });
  }

  return (
    <div className="form-block">
      {isSent ? 
        <AfterSent /> : 
        (<div className="container">
          <Element name="signup">
            <div className="title">Working with POST request</div>
   
          <Formik 
            initialValues={{
                name: '',
                email: '',
                phone: '',
                position: '',
                photo: null,
                position_id: '',
            }}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={submitFormHandler}
          >
            {({values, errors, touched, handleChange, handleBlur,
              isValid, dirty, setFieldValue}) => (
            
              <Form className="form" method='POST'>
                <div className='form-control'>
                  <Field 
                      className={`form-input ${errors?.name && touched.name ? 
                        'red-border' : 
                        null }`}
                      type="text" 
                      name="name"
                      id="name"
                      placeholder=" "
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                  />
                  <label htmlFor="name" 
                    className={`form-label ${errors?.name && touched.name ? 
                      'form-label__error' : 
                      null }`}
                  >Your name</label>

                  {touched.name && errors.name && 
                    <p className='error-message'>{errors.name}</p>}
                </div>

                <div className='form-control'>
                  <Field 
                    className={`form-input ${errors?.email && touched.email ? 
                      'red-border' : 
                      null }`}
                    type="email" 
                    name="email"
                    id="email"
                    placeholder=" "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <label htmlFor="email" 
                    className={`form-label ${errors?.email && touched.email ? 
                      'form-label__error' : 
                      null }`}
                    >Email</label>

                    {touched.email && errors.email && 
                      <p className='error-message'>{errors.email}</p>}
                </div>

                <div className='form-control'>
                  <Field 
                    className={`form-input ${errors?.phone && touched.phone ? 
                      'red-border' : 
                      '' }`}
                    type="phone" 
                    name="phone"
                    id="phone"
                    placeholder=" "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <label htmlFor="phone"
                    className={`form-label ${errors?.phone && touched.phone ? 
                      'form-label__error' : 
                      null }`}
                  >
                    Phone
                  </label>

                  {touched.phone && errors.phone ? 
                    <p className='error-message'>{errors.phone}</p> :
                    <p className="helper-message">+38 (XXX) XXX - XX - XX</p>
                  }
                </div>

                <div className='positions'>
                  <p className="positions-title">Select your position</p>

                  {positions.map(position => (
                    <label key={position.id}  className="positions-label">
                      <Field
                        className="positions-mark"
                        checked={+values.position_id === position.id}
                        type='radio'
                        name="position_id"
                        id={position.id}
                        value={position.id}
                      />
                      {position.name}
                    </label>
                  ))}
                  {touched.position_id && errors.position_id && 
                    <p className='error-message'>{errors.position_id}</p>
                  }
                </div>

                <div className="form-control form-control__photo">
                  <input  className="input-file"
                    type="file"
                    name="photo"
                    id="file"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      const files = event.target.files;
                      return setFieldValue('photo', files[0]);
                    }}
                  />
                  <label htmlFor="file"
                    className={errors?.photo && touched.photo ? `red-border` : ''} >
                    Upload
                  </label>
                  <label
                    className={errors.photo && touched.photo ? `red-border` : ''}>
                    {values.photo !== null ? 
                      (values.photo?.name.length > 30 ?
                        values.photo?.name.substring(0, 25) + '...'
                      : values.photo.name
                      ) : 
                      "Upload your photo"}
                  </label>

                  <div>
                    {touched.photo && errors.photo && 
                      <p className='error-message'>{errors.photo}</p>}
                  </div>
                </div>

                <div className="form-btn">
                  <button type="submit" className="page-button"
                    disabled={!(isValid && dirty)}
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            )}

          </Formik>
        </Element>
      </div>)
      }
    </div>
  )
}

export default FormBlock;
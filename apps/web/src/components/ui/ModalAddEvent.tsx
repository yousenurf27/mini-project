import CustomInput from '@/components/ui/CustomInput'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup';
import { motion } from 'framer-motion'
import { useAppDispatch } from '@/lib/hook'
import {Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  DatePicker,
  DateValue,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { addEventByIdThunk } from '@/lib/features/mystore/myStoreSlice';

const eventSchema = Yup.object().shape({
  title: Yup.string().matches(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/, 'Can only contain characters.').required('Title is required'),
  desc: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  attendee: Yup.number().required('Attendee is required'),
  location: Yup.string().matches(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/, 'Can only contain characters.').required('Location is required'),
  type: Yup.string().matches(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/, 'Can only contain characters.').required('Type is required'),
  file: Yup.mixed().required('Image is required')
    .test('imageFormat', 'Only .png .jpg .jpeg image types are allowed', (value : any) => {
      if(value) {
        const supportedFormats = ['png', 'jpg', 'jpeg'];
        return supportedFormats.includes(value.name.split('.').pop());
      }
      // return true
    })
});

const ModalAddEvent = (props: any) => {
  let [date, setDate] = useState<DateValue | any>(parseAbsoluteToLocal(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()));
  let [dateRegis, setDateRegis] = useState<DateValue | any>(parseAbsoluteToLocal(new Date().toISOString()));
  const { isOpen, onOpenChange } = props;
  const [pending, setPending] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    validationSchema: eventSchema,
    initialValues: {
      title: '',
      desc: '',
      price: '',
      attendee: '',
      location: '',
      type: '',
      file: '',
    },
    onSubmit: async (values, { resetForm }) => {
      setPending(true)
      const start = date.toDate(date.timeZone).toISOString()
      const lastRegister = dateRegis.toDate(dateRegis.timeZone).toISOString()
      const payload = {
        ...values,
        start,
        lastRegister,
      }

      dispatch(addEventByIdThunk(payload))

      setPending(false)
      resetForm();
    },
  });

  const handleChangeFile = (e: any) => {
    formik.setFieldValue('file', e.target.files[0]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior='inside'
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <div className='pt-4'>
                  <CustomInput
                    className='max-w-xs'
                    type="text"
                    label="Title"
                    name="title"
                    minLength={10}
                    placeholder="Enter your title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    isRequired
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className='text-tiny text-danger mt-1'>{formik.errors.title}</p>
                  )}
                </div>
                <div className='pt-4'>
                  <Textarea
                    label="Description"
                    name='desc'
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    className="w-full"
                    classNames={{
                      label: 'z-0'
                    }}
                    minLength={50}
                    value={formik.values.desc}
                    onChange={formik.handleChange}
                    isRequired
                  />
                  {formik.touched.desc && formik.errors.desc && (
                    <p className='text-tiny text-danger mt-1'>{formik.errors.desc}</p>
                  )}
                </div>
                <div className='pt-4'>
                  <DatePicker
                    label="Start Event"
                    name='start'
                    className="w-full max-w-xs"
                    value={date}
                    onChange={setDate}
                    minValue={parseAbsoluteToLocal(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString())}
                    labelPlacement="outside"
                  />
                </div>
                <div className='pt-4'>
                  <DatePicker
                    label="Last Register"
                    name='lastRegister'
                    className="w-full max-w-xs"
                    granularity="day"
                    value={dateRegis}
                    onChange={setDateRegis}
                    minValue={parseAbsoluteToLocal(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())}
                    labelPlacement="outside"
                  />
                </div>
                <div className='pt-4'>
                  <CustomInput
                    type="number"
                    name='price'
                    className='max-w-xs'
                    label="Price"
                    placeholder="0"
                    min={0}
                    labelPlacement="outside"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">IDR</span>
                      </div>
                    }
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    isRequired
                  />
                  {formik.touched.price && formik.errors.price && (
                    <p className='text-tiny text-danger mt-1'>{formik.errors.price}</p>
                  )}
                </div>
                <div className='pt-4'>
                  <CustomInput
                    type="number"
                    name='attendee'
                    className='max-w-xs'
                    label="Attendees"
                    placeholder="0"
                    min={0}
                    labelPlacement="outside"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">Attendees</span>
                      </div>
                    }
                    value={formik.values.attendee}
                    onChange={formik.handleChange}
                    isRequired
                  />
                  {formik.touched.attendee && formik.errors.attendee && (
                    <p className='text-tiny text-danger mt-1'>{formik.errors.attendee}</p>
                  )}
                </div>
                <div className='pt-4'>
                  <CustomInput
                    className='max-w-xs'
                    type="text"
                    label="Location"
                    name="location"
                    minLength={5}
                    maxLength={100}
                    placeholder="Enter your location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    isRequired
                  />
                  {formik.touched.location && formik.errors.location && (
                    <p className='text-tiny text-danger mt-1'>{formik.errors.location}</p>
                  )}
                </div>
                <div className='pt-4'>
                  <CustomInput
                    className='max-w-xs'
                    type="text"
                    label="Type"
                    name="type"
                    minLength={3}
                    maxLength={50}
                    placeholder="Enter your type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    isRequired
                  />
                  {formik.touched.type && formik.errors.type && (
                    <p className='text-tiny text-danger mt-1'>{formik.errors.type}</p>
                  )}
                </div>
                <div className='pt-4'>
                  <label className="block mb-2 text-sm font-medium text-foreground dark:text-white">Upload Image</label>
                  <input type="file" name='file' accept='image/*'
                  className="relative h-9 px-2 w-auto max-w-xs file:absolute file:right-0  file:bg-emerald-500 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-md text-gray-600"
                  required
                  onChange={handleChangeFile}
                  />
                  {formik.touched.file && formik.errors.file && (
                    <p className='text-tiny text-danger mt-1'>{formik.errors.file}</p>
                  )}
                </div>

                <div className='flex justify-center pt-6'>
                  <motion.button
                    type='submit'
                    className={`mx-auto w-10/12 transition-all ${pending ? 'bg-emerald-200' : 'bg-emerald-500 hover:bg-emerald-700'} text-white font-bold py-2 px-4 rounded-xl`}
                    whileTap={{ scale: .7 }}
                    disabled={pending}
                  >
                    {pending ? <Spinner color="success"/> : 'Submit'}
                  </motion.button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalAddEvent
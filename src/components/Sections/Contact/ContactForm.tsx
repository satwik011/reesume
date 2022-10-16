import {FC, useRef ,memo, useCallback, useMemo, useState} from 'react';

import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );

  const [data] = useState<FormData>(defaultData);


  const form = useRef();
  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
     
      emailjs.sendForm('service_sk6c0pd', 'template_m78ub7o', form.current!, '18t1gx4IW1abdM9H4') .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
     
    },
    [data],
  );

  const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm';

  return (
   

    <form className="grid min-h-[320px] grid-cols-1 gap-y-4" method="POST" ref={form} onSubmit={handleSendMessage}>
      <input className={inputClasses} type="text" name="user_name" placeholder='name' />
      <input
        autoComplete="email"
        className={inputClasses}
        type="email" name="user_email" 
        placeholder='Email'
      />
      <textarea
        className={inputClasses}
        maxLength={250}
       
        name="message"
        placeholder="Message"
        required
        rows={6}
      />
      <button
        aria-label="Submit contact form"
        className="w-max rounded-full border-2 border-orange-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800"
        type="submit" value="Send">
        Send Message
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;

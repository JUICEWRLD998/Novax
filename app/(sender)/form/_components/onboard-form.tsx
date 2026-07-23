"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { userFormDef, userValidationSchema } from '@/models/validations/userinfo.validation';
import { useFormStore } from '@/store/form.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image'
import { useForm } from 'react-hook-form';

const OnboardForm = () => {

    const {steps, setSteps, setSenderFirstName, setSenderEmail, setRecipientFirstName} = useFormStore();

    const form = useForm<userFormDef>({
        resolver: zodResolver(userValidationSchema),
        defaultValues: {
            senderFirstName: "",
            senderEmail: "",
            recipientFirstName: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: userFormDef) {
        console.log(values);
        setSenderFirstName(values.senderFirstName);
        setSenderEmail(values.senderEmail);
        setRecipientFirstName(values.recipientFirstName);
        setSteps(steps + 1)
    }
  return (
    <div className="flex flex-col items-center gap-8 h-full max-h-screen">
        <div className='flex flex-col gap-[50px] items-center mt-[45px]'>
            <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest ">Let’s send your <span className="text-[50px] font-bold font-pp-neuebit">Message.</span></h1>
            <Image src="/assets/iconsss.svg" alt="icons" width={655} height={102} className="" draggable={false} />
        </div>
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-[600px]">
                        <FormField
                            control={form.control}
                            name="senderFirstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[28px] font-bold font-pp-neuebit text-black mb-3 block">Your Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            className='bg-[#FAF9F5] rounded-lg focus:border-black border-2 border-gray-300 py-6 px-6 text-[32px] font-semibold text-black placeholder:text-gray-400 placeholder:font-normal' 
                                            placeholder="Enter your name" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[18px] mt-2" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="senderEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[28px] font-bold font-pp-neuebit text-black mb-3 block">Your Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            className='bg-[#FAF9F5] rounded-lg focus:border-black border-2 border-gray-300 py-6 px-6 text-[32px] font-semibold text-black placeholder:text-gray-400 placeholder:font-normal' 
                                            placeholder="Enter your email" 
                                            type="email"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[18px] mt-2" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="recipientFirstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[28px] font-bold font-pp-neuebit text-black mb-3 block">Their Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            className='bg-[#FAF9F5] rounded-lg focus:border-black border-2 border-gray-300 py-6 px-6 text-[32px] font-semibold text-black placeholder:text-gray-400 placeholder:font-normal' 
                                            placeholder="Enter their name" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[18px] mt-2" />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="submit" 
                            className='text-black text-[24px] font-bold mx-auto hover:text-white hover:bg-black w-[150px] bg-[#FFF3F3] py-6 px-6 flex items-center gap-3 mt-8'
                        >
                            Next <ArrowRight size={28} /> 
                        </Button>
                    </form>
                </Form> 
    
        </div>
  )
}

export default OnboardForm
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useWaitingList } from '@/hooks/useWaitingList';
import { cn } from '@/core/utils/styles';

const formSchema = z.object({
  email: z.string()
    .min(1, 'Email-ul este obligatoriu')
    .email('Adresa de email nu este validă'),
  name: z.string().optional(),
  phone: z.string()
    .regex(
      /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/,
      'Numărul de telefon nu este valid'
    )
    .optional()
    .or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

export default function WaitingListForm() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  
  const { joinWaitingList, isLoading, error: submitError } = useWaitingList({
    onSuccess: () => {
      reset();
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 3000);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  const processSubmit = async (data: FormData) => {
    try {
      await joinWaitingList(data.email, data.name, data.phone);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="farm-gradient p-3 md:p-4 text-white">
        <h2 className="text-lg md:text-xl font-bold text-center">
          Înscrie-te în Lista de Așteptare
        </h2>
        <p className="text-center mt-1 opacity-90 text-xs md:text-sm">
          Fii primul care află când Farm2Door se lansează în zona ta.
        </p>
      </div>
      
      <div className="p-3 md:p-4 space-y-2 md:space-y-3">
        {submitError && (
          <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
            {submitError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
              Email
              <span className="text-destructive"> *</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@exemplu.ro"
              className={cn(
                'input-field',
                errors.email && 'border-destructive'
              )}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
              Nume și prenume
            </label>
            <input
              type="text"
              id="name"
              placeholder="Ion Popescu"
              className={cn(
                'input-field',
                errors.name && 'border-destructive'
              )}
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="07XX XXX XXX"
              className={cn(
                'input-field',
                errors.phone && 'border-destructive'
              )}
              {...register('phone')}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <Button 
          type="button"
          onClick={handleSubmit(processSubmit)}
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full"
        >
          Înscrie-te în lista de așteptare
        </Button>
      </div>

      <Modal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        className="text-center"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-primary/10 p-3">
            <svg 
              className="h-6 w-6 text-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Mulțumim pentru înscriere!
          </h3>
          <p className="text-muted-foreground">
            Te vom anunța când lansăm Farm2Door în zona ta.
          </p>
        </div>
      </Modal>
    </div>
  );
} 
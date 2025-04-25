"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <Image src="/vrai.png" alt="Logo" width={100} height={100} className="rounded-full shadow-lg" />
        </div>

        <Card className="bg-white/60 backdrop-blur-md shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-center text-orange-600 text-3xl">Connexion à WenzeBdd</CardTitle>
            <p className="text-center text-sm text-gray-600">Entrez vos informations pour continuer</p>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
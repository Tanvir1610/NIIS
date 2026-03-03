'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle, AlertCircle, Calendar, MapPin, User, Mail, Phone, Building, MessageSquare, CreditCard, ChevronRight, Lock } from 'lucide-react';

const PACKAGES = {
    attendee: 1000,
    student: 800,
    faculty: 1500,
    presenter: 2000,
};

const TRACKS = [
    'Track 1: Artificial Intelligence & Machine Learning',
    'Track 2: Internet of Things & Embedded Systems',
    'Track 3: Cyber Security & Blockchain',
    'Track 4: Data Science & Cloud Computing',
];

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        university: '',
        location: { city: '', state: '', country: '' },
        participantType: 'attendee',
        track: '',
        paperTitle: '',
        transactionId: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const amount = PACKAGES[formData.participantType as keyof typeof PACKAGES];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prev: any) => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Upload payment screenshot (backend handles base64, so convert first)
            let paymentScreenshotBase64 = null;
            if (imageFile) {
                paymentScreenshotBase64 = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(imageFile);
                });
            }

            const payload = {
                ...formData,
                paymentScreenshot: paymentScreenshotBase64,
            };

            const res = await fetch('/api/participants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            setSuccess(true);
            window.scrollTo(0, 0);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-muted/30 py-20 px-4 flex items-center justify-center">
                <div className="bg-white max-w-lg w-full p-8 rounded-xl shadow-lg text-center border border-green-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-green-800 mb-4">Registration Successful!</h2>
                    <p className="text-foreground/70 mb-8">
                        Thank you for registering for NIIS 2026. Your application is currently <strong>pending verification</strong>.
                        Once our accountant verifies your payment, you will receive a confirmation email with your unique Participant ID.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Button onClick={() => router.push('/')} className="w-full">Back to Home</Button>
                        <Button variant="outline" onClick={() => window.location.reload()} className="w-full">Register Another Participant</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">Conference Registration</h1>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        Join us at NIIS 2026. Please fill out the form below to secure your spot.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Personal Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                                        <User className="w-5 h-5 text-primary" /> Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Full Name *</label>
                                            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Email *</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="john@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Phone</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="+91 98765 43210" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">University / Organization</label>
                                            <input type="text" name="university" value={formData.university} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="GCET" />
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 pt-4">
                                        <MapPin className="w-5 h-5 text-primary" /> Location
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">City</label>
                                            <input type="text" name="location.city" value={formData.location.city} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="City" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">State</label>
                                            <input type="text" name="location.state" value={formData.location.state} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="State" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Country</label>
                                            <input type="text" name="location.country" value={formData.location.country} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Country" />
                                        </div>
                                    </div>
                                </div>

                                {/* Registration Type */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 pt-4">
                                        <Building className="w-5 h-5 text-primary" /> Registration Type
                                    </h3>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">I am registering as *</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {Object.keys(PACKAGES).map((type) => (
                                                <div
                                                    key={type}
                                                    onClick={() => setFormData(prev => ({ ...prev, participantType: type }))}
                                                    className={`cursor-pointer border rounded-lg p-3 text-center transition-all ${formData.participantType === type
                                                        ? 'bg-primary text-white border-primary ring-2 ring-primary/20'
                                                        : 'bg-white hover:bg-muted'
                                                        }`}
                                                >
                                                    <div className="font-semibold capitalize">{type}</div>
                                                    <div className="text-xs opacity-80">₹{PACKAGES[type as keyof typeof PACKAGES]}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {formData.participantType === 'presenter' && (
                                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 space-y-4 animate-in fade-in slide-in-from-top-2">
                                            <div>
                                                <label className="block text-sm font-medium mb-1 text-orange-900">Select Track *</label>
                                                <select required name="track" value={formData.track} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 outline-none bg-white">
                                                    <option value="">-- Select Track --</option>
                                                    {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1 text-orange-900">Paper Title *</label>
                                                <input required type="text" name="paperTitle" value={formData.paperTitle} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 outline-none" placeholder="Enter your paper title" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Uploads */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 pt-4">
                                        <Upload className="w-5 h-5 text-primary" /> Verification Uploads
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Payment Screenshot *</label>
                                            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/30 transition-colors relative">
                                                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                {imagePreview ? (
                                                    <img src={imagePreview} alt="Preview" className="max-w-full max-h-32 object-contain mx-auto rounded" />
                                                ) : (
                                                    <div className="text-foreground/50">
                                                        <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                                        <span className="text-xs">Upload payment screenshot</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Payment Transaction ID *</label>
                                            <input required type="text" name="transactionId" value={formData.transactionId} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-mono" placeholder="Enter UPI/Bank Ref No" />
                                            <p className="text-xs text-foreground/50 mt-2">
                                                Please complete the payment using the QR code on the right and enter the reference number here.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                                        <AlertCircle className="w-4 h-4" /> {error}
                                    </div>
                                )}

                                <Button type="submit" disabled={loading} className="w-full py-6 text-lg font-semibold">
                                    {loading ? 'Submitting Registration...' : `Complete Registration (₹${amount})`}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar - Payment Info */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Payment Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-border p-6 text-center">
                                <h3 className="font-bold text-lg mb-4">Scan to Pay</h3>
                                <div className="bg-white p-4 inline-block rounded-lg shadow-inner border mb-4">
                                    {/* Placeholder QR Code - In a real app, this would change based on amount */}
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=niis2026@upi&pn=NIIS2026&am=${amount}&cu=INR`}
                                        alt="Payment QR Code"
                                        className="w-48 h-48 mx-auto object-contain"
                                    />
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-foreground/60 mb-1">Total Amount</p>
                                    <p className="text-4xl font-bold text-primary">₹{amount}</p>
                                </div>
                                <p className="text-xs text-foreground/50">
                                    Scan using any UPI app (GPay, PhonePe, Paytm). The amount is auto-filled based on your selection.
                                </p>
                            </div>

                            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> Need Help?
                                </h4>
                                <p className="text-sm text-blue-800 mb-4">
                                    If you face any issues with payment or registration, please contact our support team.
                                </p>
                                <div className="bg-white/50 rounded p-3 text-sm font-mono text-blue-900">
                                    support@niis2026.com
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, Lock, ChevronRight } from 'lucide-react';

const policySections = [
    {
        icon: <CreditCard size={28} />,
        title: 'Payment and Cancellation policy',
        items: [
            { subtitle: 'Financial Responsibility', text: 'Clients affirm they have assessed their own financial capacity and voluntarily agreed to the fees.' },
            { subtitle: 'Non-Refundable Payments', text: 'All payments, including special arrangements or discounted offers, are strictly non-refundable under any circumstances.' },
            { subtitle: 'Full Fee Obligation', text: 'Clients are responsible for the full service fee regardless of whether they complete or discontinue the service.' },
            { subtitle: 'Cancellation', text: 'Cancellations are not permitted once a session has been booked.' },
            {
                subtitle: 'Rescheduling',
                points: [
                    'Requests to reschedule must be made at least 72 hours before the scheduled appointment.',
                    'Requests made within 24 hours of the session are subject to availability and may incur an additional fee.'
                ]
            },
            { subtitle: 'No-Show Policy', text: 'Failure to attend a scheduled session without prior notice is considered a "no-show," and 100% of the session fee will be charged.' },
            { subtitle: 'Dispute Resolution', text: 'Any concerns or disputes must be addressed directly with the company; clients agree not to engage in defamation or disparagement on social media platforms.' },
        ],
    },
    {
        icon: <Lock size={28} />,
        title: 'Privacy Policy',
        items: [
            { subtitle: 'Personal Information Collection', text: 'The site automatically collects certain information about a user\'s device (IP address, time zone, cookies) and personal details provided during registration (name, address, payment information).' },
            { subtitle: 'Data Usage', text: 'Information is processed to maintain site security, identify potential risk or fraud, and provide users with requested services or information.' },
            { subtitle: 'User Rights', text: 'European residents have specific rights regarding their data, including the right to be informed, the right of access, the right to rectification, and the right to erasure.' },
            { subtitle: 'Information Security', text: 'Data is secured on computer servers in a controlled environment protected from unauthorized access.' },
            { subtitle: 'Legal Disclosure', text: 'Personal information will be disclosed if required by law, such as to comply with a subpoena or similar legal process.' },
        ],
    },
];

const Policies = () => {
    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <br />
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Our Policies</h1>
                    <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto italic">
                        "Clarity brings peace of mind. We believe in transparency as the foundation of our work together."
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {policySections.map((section, idx) => (
                        <motion.section
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-lg glass text-[var(--color-secondary)]">
                                    {section.icon}
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-white">{section.title}</h2>
                            </div>

                            <div className="grid gap-6">
                                {section.items.map((item, i) => (
                                    <div key={i} className="glass rounded-xl p-8 border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <ChevronRight size={20} className="text-[var(--color-secondary)] mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="text-xl font-serif font-semibold text-[var(--color-secondary)] mb-2">
                                                    {item.subtitle}
                                                </h3>
                                                {item.text && (
                                                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                                                        {item.text}
                                                    </p>
                                                )}
                                                {item.points && (
                                                    <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)] leading-relaxed mt-2 ml-2">
                                                        {item.points.map((point, pi) => (
                                                            <li key={pi}>{point}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>

                <div className="text-center mt-24 pt-12 border-t border-white/5">
                    <p className="text-[var(--color-text-muted)] mb-4">
                        For any questions regarding our policies, please reach out to us:
                    </p>
                    <a
                        href="mailto:contact@decodeyourlife.in"
                        className="text-2xl font-serif text-[var(--color-secondary)] hover:underline"
                    >
                        contact@decodeyourlife.in
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Policies;

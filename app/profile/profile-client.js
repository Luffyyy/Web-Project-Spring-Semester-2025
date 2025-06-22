'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { updateProfile } from '../actions';
import Input from '@/components/input';
import MuscleGroup from '@/components/muscle-group';
import { muscleGroups } from '../browse/exercise-list';

/* ---------- helpers ---------- */
function bmiStatus(bmi) {
    if (!bmi && bmi !== 0) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25)   return 'Normal weight';
    if (bmi < 30)   return 'Overweight';
    if (bmi < 40)   return 'Obese';
    return 'Morbidly obese';
}

function badgeClasses(status) {
    const base = 'inline-block rounded-full px-3 py-0.5 text-sm font-semibold';
    return {
        'Underweight':    `${base} bg-sky-600/20 text-sky-300 ring-1 ring-sky-500/40`,
        'Normal weight':  `${base} bg-green-600/20 text-green-300 ring-1 ring-green-500/40`,
        'Overweight':     `${base} bg-yellow-600/20 text-yellow-200 ring-1 ring-yellow-500/40`,
        'Obese':          `${base} bg-orange-600/20 text-orange-300 ring-1 ring-orange-500/40`,
        'Morbidly obese': `${base} bg-red-600/20 text-red-300 ring-1 ring-red-500/40`,
    }[status] ?? base;
}

/* ---------- component ---------- */
export default function ProfileClient({ user }) {
    const [height, setHeight] = useState(user.heightCm ?? '');
    const [weight, setWeight] = useState(user.weightKg ?? '');
    const [pwd, setPwd]       = useState('');
    const [bmi, setBmi]       = useState('');
    const [isPending, start]  = useTransition();
    const [msg, setMsg]       = useState('');
    const [avoidMuscles, setAvoidMuscles] = useState(user.avoidMuscles ?? []);

    /* live BMI calculation */
    useEffect(() => {
        if (height && weight) {
            const h = parseFloat(height) / 100;
            const val = parseFloat(weight) / (h * h);
            setBmi(Number.isFinite(val) ? val.toFixed(1) : '');
        } else {
            setBmi('');
        }
    }, [height, weight]);

    async function handleSave(e) {
        e.preventDefault();
        start(async () => {
            try {
                await updateProfile({
                    heightCm: parseFloat(height),
                    weightKg: parseFloat(weight),
                    password: pwd,
                    avoidMuscles: avoidMuscles
                });
                setMsg('Saved!');
            } catch {
                setMsg('Error saving data');
            }
        });
    }

    return (
        <section className="flex justify-center py-10">
            <div className="w-full max-w-2xl space-y-8 content">
                <h1 className="text-center text-4xl font-bold tracking-tight">Profile</h1>

                <div className="space-y-1 text-lg leading-relaxed">
                    <p><span className="font-semibold">Username:</span> {user.username}</p>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                    <p><span className="font-semibold">Birth&nbsp;date:</span> {user.dob}</p>
                </div>

                <div className="flex flex-col gap-3">
                    <Input
                        label="Password: "
                        type="text"
                        required
                        value={pwd}
                        onChange={setPwd}
                    />
                    <br />
                    <Input
                        label="Height (cm): "
                        type="number"
                        required
                        value={height}
                        onChange={setHeight}
                    />
                    <br />
                    <Input
                        label="Weight (kg): "
                        type="number"
                        required
                        value={weight}
                        onChange={setWeight}
                    />

                    {bmi && (
                        <div className="flex items-center justify-between text-lg">
                            <span><strong>BMI:</strong> {bmi}</span>
                            <span className={badgeClasses(bmiStatus(+bmi))}>
                                {bmiStatus(+bmi)}
                            </span>
                        </div>
                    )}

                    <label className="block mb-2">
                        Need a break from certain muscles?<br />
                        Select them and we&apos;ll skip exercises that target them.
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4 w-full justify-center overflow-y-auto" style={{ minHeight: "350px", maxHeight: "260px" }}>
                        {muscleGroups.map(muscle => (
                            <MuscleGroup key={muscle} name={muscle} tags={avoidMuscles} setTags={setAvoidMuscles}/>
                        ))}
                    </div>

                    <button
                        type="submit"
                        onClick={handleSave}
                        disabled={isPending}
                        className="btn w-full rounded-full bg-emerald-600/80 px-6 py-2 text-lg font-medium shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60"
                    >
                        {isPending ? 'Saving…' : 'Save'}
                    </button>

                    {msg && <p className="text-center text-sm text-green-400">{msg}</p>}
                </div>
            </div>
        </section>
    );
}

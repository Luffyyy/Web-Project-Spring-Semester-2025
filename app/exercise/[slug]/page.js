import getMongoCollection from '@/lib/getMongoCollection';
import { capitalize } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const { slug } = await params;
    const exercises = await getMongoCollection('exercises');
    const exercise = await exercises.findOne({ name: slug });

    if (!exercise) {
        return notFound();
    }

    return <div className="flex w-full gap-6">
        <iframe className="xl:w-[70%] lg:w-[60%] aspect-video w-full rounded" id="exercise-video"
            src={exercise.video} title="How to squat ✅"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen="allowfullscreen"> 
        </iframe>
        <div className="content p-4 overflow-hidden" style={{flex: 1}}>
            <strong className="text-2xl " id="exercise-title">
                {exercise.title}
            </strong>
            <br/>
            <span id="exercise-difficulty">
                {capitalize(exercise.difficulty)}
            </span>
            <br/>
            <br/>
            <p className="whitespace-break-spaces" id="exercise-description">
                {exercise.description}
            </p>
        </div>
    </div>
}
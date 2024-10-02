import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ITask } from '../interfaces';


interface Task {
    id: string;
    content: string;
    completed: boolean;
    publishedAt: number;
}

interface Props {
    task: ITask;
    onFinish: (id: string) => void;
    onDelete: (id: string) => void;
    isFinished?: boolean;
}

export default function Task({ task, onFinish, onDelete, isFinished = false }: Props) {
    return (
        <div className="flex flex-1 justify-between items-center gap-2 w-full">
            <button
                className={`border-2 rounded-full min-h-4 min-w-4 transition-colors 
                    ${isFinished ? 'border-purple-dark bg-purple-dark' : 'border-blue bg-transparent'}
                    hover:${isFinished ? 'border-purple' : 'border-blue-dark'} hover:bg-gray-600`}
                onClick={() => onFinish(task.id)}
            >
                {isFinished && <CheckIcon className='w-3 h-3' />}
            </button>
            <span className={`flex text-sm w-full
                ${isFinished ? 'line-through text-blue' : 'text-gray-300'}`}>
                {task.description}
            </span>
            <button className="text-gray-300 bg-transparent border-none" 
                onClick={() => onDelete(task.id)}>
                <TrashIcon className="w-5 h-5 text-blue-400" />
            </button>
        </div>
    );
}
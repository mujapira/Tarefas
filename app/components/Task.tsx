import trash from '../assets/trash.svg';
import done from '../assets/done.svg';
import Image from 'next/image';

interface Task {
    id: string;
    content: string;
    completed: boolean;
    publishedAt: number;
}

interface Props {
    task: Task;
    onFinish: (id: string) => void;
    onDelete: (id: string) => void;
    isFinished?: boolean;
}

export default function Task({ task, onFinish, onDelete, isFinished = false }: Props) {
    return (
        <div className="flex items-center gap-2">
            <button
                className={`border-2 rounded-full h-4 w-4 transition-colors ${
                    isFinished ? 'border-purple-dark bg-purple-dark' : 'border-blue bg-transparent'
                } hover:${isFinished ? 'border-purple' : 'border-blue-dark'} hover:bg-gray-600`}
                onClick={() => onFinish(task.id)}
            >
                {isFinished && <Image src={done} width={16} height={16} alt="Done" />}
            </button>
            <span className={`flex-1 text-sm ${isFinished ? 'line-through text-blue' : 'text-gray-300'}`}>
                {task.content}
            </span>
            <button className="text-gray-300 bg-transparent border-none" onClick={() => onDelete(task.id)}>
                <Image src={trash} width={16} height={16} alt='Delete' />
            </button>
        </div>
    );
}
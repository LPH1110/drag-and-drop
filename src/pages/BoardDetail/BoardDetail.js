import React from 'react';
import { useParams } from 'react-router-dom';
import { Board } from '~/components';

function BoardDetail() {
    const { id } = useParams();
    return (
        <div className="w-full overflow-x-auto">
            <h1 className="mb-8">BoardDetail {id}</h1>
            <Board />
        </div>
    );
}

export default BoardDetail;

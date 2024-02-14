import React, {useCallback} from 'react';
import { useEffect, useState } from 'react'
import { api } from "../api"
import { UserContext } from '../contexts/UserContext.jsx';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import { useParams } from 'react-router-dom';
 
import 'reactflow/dist/style.css';
 
 
export const Playground = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

    const initialNodes = [
        { id: '1', position: { x: windowSize.width / 2, y: windowSize.height / 4 }, data: { label: '1' } },
        { id: '2', position: { x: windowSize.width / 2, y: windowSize.height / 2 }, data: { label: '2' } },
      ];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [lesson, setLesson] = useState({})

    const {id} = useParams();
    
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
      );

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight})
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await api.get(`/api/lessons/${id}`);
                setLesson(res.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchLesson();
    },[])

console.log("LESSON",lesson);
  return (
    <div className={`w-screen h-screen flex flex-col items-center`}>
        <h1>{lesson.title}</h1>
        <ReactFlow 
            nodes={nodes} 
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}>
            <Controls />
            <MiniMap />
            <Background variant='dots' gap={12} size={1}/>
        </ReactFlow>
    </div>
  );
}
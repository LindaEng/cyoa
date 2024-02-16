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


    const [initialNodes, setInitialNodes] = useState([]);
    const [initialEdges, setInitialEdges] = useState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [lesson, setLesson] = useState({})
    

    const {id} = useParams();


    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await api.get(`/api/lessons/${id}`);
        console.log("LESSON FROM PLAYGROUND", res.data);

                setLesson(res.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchLesson();
    },[])


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
        if (lesson) {
            createInitialNodes(lesson);
            createInitalEdges(lesson);
        }
    }, [lesson]);

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
      }, [initialNodes, initialEdges]);

    const createInitialNodes = (lesson) => {
        const initialPosition = {x: windowSize.width / 2, y: windowSize.height / 4}
        const nodes = lesson?.sections?.map((section, index) => {
            return {
                id: index.toString(),
                position: {...initialPosition, y: initialPosition.y + index * 100},
                data: {label: section}
            }
        }) || [];
        setInitialNodes(nodes)
        setNodes(nodes);
    }
    
    const createInitalEdges = (lesson) => {
        const edges = lesson?.sections?.map((session, index) => {
            return {
                id: `e${index}-${index + 1}`,
                source: index.toString(),
                target: (index + 1).toString(),
            }
        }) || [];
        setInitialEdges(edges)
        setEdges(edges);
    }
    
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
      );

    console.log('noddes ',nodes, edges);

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
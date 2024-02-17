import React, {useCallback} from 'react';
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import { api } from "../../api/index.js"
import { UserContext } from '../../contexts/UserContext.jsx';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import { useParams } from 'react-router-dom';
import { Drawer } from '../Playgrond/Drawer.jsx';
 
import 'reactflow/dist/style.css';

const customComponent = (lessonPlan) => {
    return (
        <>
            <Drawer />
            <Markdown 
                className={`prose lg:prose-xl text-sm w-full`}
                remarkPlugins={[remarkGfm, [remarkSlug, {slugify: s => s.toLowerCase()}]]} 
            >
                {lessonPlan}
            </Markdown>    
        </>
    )
}
 
 
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
    const [isOpen, setIsOpen] = useState(false);
    

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
                const initialPosition = {x: windowSize.width / 2, y: windowSize.height / 4}
                const nodes = lesson?.sections?.map((section, index) => {
                    return {
                        id: index.toString(),
                        position: {...initialPosition, y: initialPosition.y + index * 100},
                        data: {label: section.title}
                    }
                }) || [];
                setNodes(nodes);
            
                const edges = lesson?.sections?.map((session, index) => {
                    return {
                        id: `e${index}-${index + 1}`,
                        source: index.toString(),
                        target: (index + 1).toString(),
                    }
                }) || [];
                setEdges(edges);
                console.log(lesson.lessonPlan);
        }
    }, [lesson]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
      );


  return (
    <div className={`relative w-screen h-screen flex flex-col items-center`}>
        <button
            className={`bg-blue-500 text-white px-4 py-2 rounded`} 
            onClick={() => setIsOpen(!isOpen)}>Open Drawer</button>
            {isOpen && (
                <div className={`absolute top-0 left-0 w-64 bg-gray-100 h-screen p-4 overflow-auto z-10`}>
                    <Markdown
                        className={`prose lg:prose-xl text-sm w-full`}
                        remarkPlugins={[remarkGfm, [remarkSlug, {slugify: s => s.toLowerCase()}]]}
                    >{lesson.lessonPlan}</Markdown>

                </div>
            )}
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
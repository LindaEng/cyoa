import React, {useCallback} from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ResizableBox } from 'react-resizable';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import { api } from "../../api/index.js"
import { UserContext } from '../../contexts/UserContext.jsx';
import { learningPlanIsolateSection } from '../../utils/learningPlanParse.jsx'
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import { useParams } from 'react-router-dom';
import { Drawer } from '../Playgrond/Drawer.jsx';
import { Modal } from '../Playgrond/Modal.jsx';
 
import 'reactflow/dist/style.css';
import { set } from 'mongoose';



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
    const [onHover, setOnHover] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nodeData, setNodeData] = useState({});
    const navigate = useNavigate();

    const {userId, lessonId} = useParams();

    //Get lesson plan and set it to lesson state
    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await api.get(`/api/lessons/${lessonId}`);
                setLesson(res.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchLesson();
    },[])

    //Set window size to state
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight})
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])

    //Set nodes and edges to state
    useEffect(() => {
        if (lesson) {
                const initialPosition = {x: windowSize.width / 2, y: windowSize.height / 4}
                const nodes = lesson?.sections?.map((section, index) => {
                    return {
                        id: index.toString(),
                        position: {
                            x: initialPosition.x + Math.sin(index) * 100, // adjust the multiplier as needed
                            y: initialPosition.y + index * 100
                        },
                        data: {label: section.title},
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
        }
    }, [lesson]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
      );

    const handleModalOpen = (e, element) => {
        const nameOfLesson = element.data.label
        const lessonPlan = lesson.lessonPlan
        updateNodeData(lesson, lessonPlan, nameOfLesson);
        setModalIsOpen(true);
    }

    const handleModalClose = () => {
        setModalIsOpen(false);
        setNodeData({});
    }

    const updateNodeData = (fullLesson, lessonPlan, section) => {
        const sectionInfo = learningPlanIsolateSection(lessonPlan, section)
        const targetNode = fullLesson.sections.find((node) => node.title === section);
        setNodeData({section, sectionInfo, lessonId: fullLesson._id, targetNode});
    }

    const handleDelete = async () => {
        try {
            const res = await api.delete(`/api/lessons/${userId}/${lessonId}`);
            console.log(res);
            navigate('/learning');
        } catch (error) {
            console.error(error);
        }
    }

    const buttonText = (isOpen, onHovered) => {
        let buttonText;
        if (isOpen) {
            buttonText = 'Close Lesson';
        } else if (onHovered) {
            buttonText = 'Show Lesson';
        } else {
            buttonText = '|||';
        }

        return buttonText;
    }

  return (
    <div className={`relative w-screen h-screen flex flex-col items-center`}>
        
        <button
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            className={`absolute top-10 right-0 bg-blue-500 text-white px-4 py-2 rounded transition-all ${isOpen || onHover ? 'w-48' : 'w-15'} z-10`}
            >
            {buttonText(isOpen, onHover)}
        </button>
        <button 
            className={`color-red-300`}
            onClick={handleDelete}>Delete plan</button>
            {modalIsOpen && nodeData && (
                <Modal
                    handleModalClose={handleModalClose}
                    title={nodeData.section}
                    sectionInfo={nodeData.sectionInfo}
                    nodeData={nodeData}
                    lesson={lesson.lessonPlan}
                />
            )}
            {isOpen && (

                <div className={`absolute top-0 left-0 w-63 bg-gray-100 h-screen p-4 overflow-auto z-10`}>
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
            onConnect={onConnect}
            onNodeDoubleClick={handleModalOpen}>
            <Controls />
            <MiniMap />
            <Background variant='dots' gap={12} size={1}/>
        </ReactFlow>
    </div>
  );
}
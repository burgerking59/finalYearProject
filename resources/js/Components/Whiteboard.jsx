
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from "react";
import { createPortal } from 'react-dom'
import TaskTracker from '@/Components/taskTracker';

var erase = false;
const Board = ({
    children,
    ...props
  }) => {

    const canvasRef = useRef();
    
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };


        window.addEventListener('resize', handleWindowResize);


        // Variables to store drawing state
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;


        const startDrawing = (e) => {
            isDrawing = true;


            [lastX, lastY] = [e.offsetX, e.offsetY];
        };


        // Function to draw
        const draw = (e) => {
            if (!isDrawing) return;
            

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                console.log(erase)
                if (erase) {
                    ctx.strokeStyle = '#FFFFFF';
                } else {
                    ctx.strokeStyle = '#000000';
                }
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }


            [lastX, lastY] = [e.offsetX, e.offsetY];
        };


        // Function to end drawing
        const endDrawing = () => {
            isDrawing = false;
        };


        const canvas = canvasRef.current;
        const ctx = canvasRef.current?.getContext('2d');


        // Set initial drawing styles
        if (ctx) {
            
            ctx.strokeStyle = '#000000';
            
            ctx.lineWidth = 5;


            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';


        }
        // Event listeners for drawing
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);


        return () => {
            // Clean up event listeners when component unmounts
            window.removeEventListener('resize', handleWindowResize);
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mouseout', endDrawing);
        };
    }, []);
    const check = () => {
        erase = !erase
    }
    const [contentRef, setContentRef] = useState(null)

    const mountNode =
        contentRef?.contentWindow?.document?.body
    return (
        <div>
            <div>
                <button id="eraseBtn" className="z-10  text-red-950 bg-emerald-400" type="button" onClick={check}>Erase</button>
            </div>
            <canvas
                ref={canvasRef}
                width={windowSize[0]}
                height={windowSize[1]}
                style={{ backgroundColor: 'white', zIndex: '0' }}
                
            />
            
            
        </div>
    );
};


export default Board;
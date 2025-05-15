import React from 'react'
import { motion } from "framer-motion";

export const Button = ({ title, btnStyles, btnClick, type, disable }) => {
    return (
        <>
            <motion.button type={type} whileTap={{ scale: 0.8 }} transition={{ duration: 0.5 }}  initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }} whileHover={{ scale: 1.05, boxShadow: "0px 5px 8px #016f4a" }} className={`relative text-center flex justify-center items-center ${btnStyles}`} onClick={btnClick} disabled={disable}>
                <span className="relative">{title}</span>
            </motion.button>
        </>
    )
}

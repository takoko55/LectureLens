import React from "react";

export const GlassCard = (props) => {
    const { width, height, name } = props;
    return (
        <div
        style={{
            width: width,
            height: height,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)"
        }}
        >
        <p>{name}</p>
        </div>
    );
};
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
 return <header className="width-full flex justify-center items-center py-[20px] bg-[var(--primary)]">
    <Image src="/To-Do-Logo.svg" alt="logo" width={231} height={60} />
 </header>
};

export default Header;
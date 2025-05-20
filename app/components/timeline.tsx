'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

import Copy from './Copy';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  title: string;
  job: string;
  date: string;
  contents: string[];
  logo?: string;
}

export const Timeline = ({ data }: { data: TimelineItem[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  useEffect(() => {
    const elements = gsap.utils.toArray('.timeline-point') as HTMLElement[];
    const splitInstances: SplitType[] = [];

    elements.forEach((el) => {
      const split = new SplitType(el, { types: 'words' });
      splitInstances.push(split);

      gsap.fromTo(
        el.querySelectorAll('.word'),
        {
          opacity: 0,
          y: 10,
          color: '#4b5563',
        },
        {
          opacity: 1,
          y: 0,
          color: '#ffffff',
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );
    });

    return () => {
      splitInstances.forEach((split) => split.revert());
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space section-spacing relative z-10" ref={containerRef}>
      <div ref={ref} className="relative pb-[40rem]">
        {data.map((item, index) => (
          <div key={index} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row gap-10"
            >
              <div className="sticky top-36 z-40 w-full md:w-[260px] flex flex-col items-start space-y-3 relative translate-x-10">
                <div className="flex items-start gap-4 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[#1f1e39] flex items-center justify-center -translate-x-10">
                    <div className="w-2 h-2 rounded-full bg-neutral-400" />
                  </div>
                  <Copy>
                    <div className="flex flex-col space-y-1 translate-x-0">
                      <h3 className="text-base font-medium text-neutral-400">{item.date}</h3>
                      <div className="hidden md:flex flex-col space-y-1">
                        <h3 className="text-lg font-semibold text-neutral-200 leading-snug">{item.title}</h3>
                        <h4 className="text-sm text-neutral-500 leading-tight">{item.job}</h4>
                        {item.logo && (
                          <div className="mt-[2px]">
                            <Image
                              src={item.logo}
                              alt={`${item.job} logo`}
                              width={50}
                              height={50}
                              className="rounded-xl object-cover bg-white shadow-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Copy>
                </div>
              </div>
              <div className="w-full md:pl-10 md:translate-x-28 max-w-[75%]">
                <div className="mb-4 md:hidden">
                  <h3 className="text-xl font-bold text-neutral-300">{item.title}</h3>
                  <h4 className="text-md text-neutral-500">{item.job}</h4>
                  <h5 className="text-sm text-neutral-400">{item.date}</h5>
                </div>
                <ul className="list-disc list-inside space-y-3 text-white text-[1rem] leading-relaxed">
                  {item.contents.map((point, idx) => (
                    <li key={idx} className="timeline-point block text-white leading-snug list-item">
                      {point.replace(/^✅ /, '')}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <div className="h-[10rem] md:h-[14rem]" />
          </div>
        ))}
        <div
          style={{ height: `${height}px` }}
          className="absolute left-2 top-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-700 to-transparent mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-[#7a57db]/50 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
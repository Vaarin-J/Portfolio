import { OrbitingCircles } from "./OrbitingCircles";
import Image from "next/image";

export function Frameworks() {
  const skills: string[] = [
    "auth0",
    "java",
    "Springboot",
    "cplusplus",
    "css3",
    "python",
    "git",
    "html5",
    "javascript",
    "microsoft",
    "react",
    "sqlite",
    "tailwindcss",
    "wordpress",
  ];

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={`outer-${index}`} src={`/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.slice().reverse().map((skill, index) => (
          <Icon key={`inner-${index}`} src={`/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

interface IconProps {
  src: string;
}

const Icon = ({ src }: IconProps) => (
  <div className="flex flex-col items-center text-center">
    <Image
      src={src}
      alt="tech icon"
      width={40}
      height={40}
      className="duration-200 rounded-sm hover:scale-110"
    />
  </div>
);
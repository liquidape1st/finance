import Image from "next/image";
import svgPaths from "./svg-8r6o20qnpx";
import imgImage from "figma:asset/36b74178f38cb3273b2afde8a40098aab9d8f487.png";

function TextContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.5] not-italic relative shrink-0 w-full" data-name="Text Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[16px] text-white tracking-[-0.48px] w-full">Tech Giants Unveil Cutting-Edge AI Innovations</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#98989a] text-[14px] tracking-[-0.42px] w-full">Technology</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p30ddd300} id="icon" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SubContainer() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex gap-[4px] items-center justify-center px-[14px] py-[6px] relative rounded-[100px] shrink-0" data-name="Sub Container">
      <div aria-hidden="true" className="absolute border border-[#262626] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Icon />
      <p className="font-['Kumbh_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#98989a] text-[14px] text-nowrap tracking-[-0.42px]" style={{ fontVariationSettings: "'YOPQ' 300" }}>
        6k
      </p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3bc1e480} id="icon" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SubContainer1() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex gap-[4px] items-center justify-center px-[14px] py-[6px] relative rounded-[100px] shrink-0" data-name="Sub Container">
      <div aria-hidden="true" className="absolute border border-[#262626] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Icon1 />
      <p className="font-['Kumbh_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#98989a] text-[14px] text-nowrap tracking-[-0.42px]" style={{ fontVariationSettings: "'YOPQ' 300" }}>
        92
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Container">
      <SubContainer />
      <SubContainer1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="var(--fill-0, #FFD11A)" fillRule="evenodd" id="Vector 431 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 bg-[#141414] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#262626] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[20px] py-[14px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#98989a] text-[14px] text-nowrap tracking-[-0.42px]">Read More</p>
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[50px] items-center relative shrink-0 w-full" data-name="Container">
      <Container />
      <Button />
    </div>
  );
}

function SubContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Sub Container">
      <TextContainer />
      <Container1 />
    </div>
  );
}

export default function Card() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative size-full" data-name="Card">
      <div className="h-[185px] relative rounded-[10px] shrink-0 w-full" data-name="Image">
        <Image alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgImage} fill />
      </div>
      <SubContainer2 />
    </div>
  );
}
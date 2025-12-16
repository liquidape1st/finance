import svgPaths from "../imports/svg-f8f5ykhcvu";
import { Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 border-t border-neutral-800">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 py-12 sm:py-14 md:py-16 border-b border-neutral-800">
        <div>
          <h4 className="text-white text-base sm:text-lg mb-5 sm:mb-7">Trang Chủ</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[#666666] text-sm">
            <li><a href="/" className="hover:text-white transition-colors">Trang Chủ</a></li>
            <li><a href="/blogs" className="hover:text-white transition-colors">Blog</a></li>
            <li className="flex items-center gap-2">
              <a href="/resources" className="hover:text-white transition-colors">Tài Nguyên</a>
              <span className="bg-[#1a1a1a] border border-neutral-800 px-2.5 py-0.5 rounded text-white text-xs">Mới</span>
            </li>
            <li><a href="#" className="hover:text-white transition-colors">Liên Hệ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Bản Tin</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base sm:text-lg mb-5 sm:mb-7">Danh Mục</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[#666666] text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Tiền Điện Tử</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chứng Khoán</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Forex</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Bất Động Sản</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tài Chính Cá Nhân</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base sm:text-lg mb-5 sm:mb-7">Công Cụ</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[#666666] text-sm">
            <li><a href="/resources" className="hover:text-white transition-colors">Công Cụ Tính Toán</a></li>
            <li><a href="/resources" className="hover:text-white transition-colors">So Sánh Sàn</a></li>
            <li className="flex items-center gap-2">
              <a href="/resources" className="hover:text-white transition-colors">Từ Điển Thuật Ngữ</a>
              <span className="bg-[#1a1a1a] border border-neutral-800 px-2.5 py-0.5 rounded text-white text-xs">Mới</span>
            </li>
            <li><a href="/resources" className="hover:text-white transition-colors">Hướng Dẫn Cơ Bản</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base sm:text-lg mb-5 sm:mb-7">Học Tập</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[#666666] text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Giao Dịch Là Gì?</a></li>
            <li className="flex items-center gap-2 flex-wrap">
              <a href="#" className="hover:text-white transition-colors">Quản Lý Rủi Ro</a>
              <span className="bg-[#1a1a1a] border border-neutral-800 px-2.5 py-0.5 rounded text-white text-xs">Quan Trọng</span>
            </li>
            <li><a href="#" className="hover:text-white transition-colors">Phân Tích Kỹ Thuật</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Phân Tích Cơ Bản</a></li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h4 className="text-white text-base sm:text-lg mb-5 sm:mb-7">Tài Liệu</h4>
          <ul className="space-y-2.5 sm:space-y-3">
            <li>
              <button className="bg-[#141414] border border-neutral-800 w-full px-3.5 py-2 rounded-md text-[#98989a] text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-between">
                E-Books
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path clipRule="evenodd" d={svgPaths.p26466280} fill="#FFD11A" fillRule="evenodd" />
                </svg>
              </button>
            </li>
            <li>
              <button className="bg-[#141414] border border-neutral-800 w-full px-3.5 py-2 rounded-md text-[#98989a] text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-between">
                Hướng Dẫn PDF
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path clipRule="evenodd" d={svgPaths.p26466280} fill="#FFD11A" fillRule="evenodd" />
                </svg>
              </button>
            </li>
            <li>
              <button className="bg-[#141414] border border-neutral-800 w-full px-3.5 py-2 rounded-md text-[#98989a] text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-between">
                Video Học
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path clipRule="evenodd" d={svgPaths.p26466280} fill="#FFD11A" fillRule="evenodd" />
                </svg>
              </button>
            </li>
            <li>
              <button className="bg-[#141414] border border-neutral-800 w-full px-3.5 py-2 rounded-md text-[#98989a] text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-between">
                Checklist
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path clipRule="evenodd" d={svgPaths.p26466280} fill="#FFD11A" fillRule="evenodd" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4 text-[#666666] text-xs sm:text-sm order-2 sm:order-1">
          <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          <span className="text-[#262626]">|</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>

        <p className="text-[#666666] text-xs sm:text-sm order-3 sm:order-2">© 2024 GOIncome. All rights reserved.</p>

        <div className="flex items-center gap-3 sm:gap-3.5 order-1 sm:order-3">
          <a href="#" className="text-white hover:text-[#ffd11a] transition-colors">
            <Twitter className="size-5" />
          </a>
          <a href="#" className="text-white hover:text-[#ffd11a] transition-colors">
            <Instagram className="size-5" />
          </a>
          <a href="#" className="text-white hover:text-[#ffd11a] transition-colors">
            <Linkedin className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
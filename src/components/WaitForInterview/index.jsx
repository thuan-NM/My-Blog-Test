// components/WaitForInterview.js
import React, { useState, useEffect } from 'react';
import { message, Button, Spin, Modal } from 'antd';
import {jwtDecode} from 'jwt-decode'; // Sửa lại import
import { FaBriefcase } from 'react-icons/fa';
import jobstatusServices from '../../services/jobstatus.services';
import moment from 'moment';

const { confirm } = Modal;

const WaitForInterview = () => {
    const storedToken = localStorage.getItem("token");
    const [decodedToken, setDecodedToken] = useState(null);
    const [interviewConfirmedCandidates, setInterviewConfirmedCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    // Giải mã token
    useEffect(() => {
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                setDecodedToken(decoded);
            } catch (error) {
                console.error("Lỗi khi giải mã token:", error);
                message.error("Token không hợp lệ hoặc bị thiếu. Vui lòng đăng nhập lại.");
                setIsLoading(false);
            }
        } else {
            message.error("Token không được tìm thấy. Vui lòng đăng nhập lại.");
            setIsLoading(false);
        }
    }, [storedToken]);

    // Lấy danh sách ứng viên đã xác nhận phỏng vấn
    useEffect(() => {
        if (!decodedToken || !decodedToken.companyId) return;
        fetchInterviewConfirmedCandidates();
    }, [decodedToken]);

    const showJoinModal = (candidate) => {
        setSelectedCandidate(candidate);
        setIsModalVisible(true);
    };

    const fetchInterviewConfirmedCandidates = async () => {
        setIsLoading(true);
        try {
            const response = await jobstatusServices.getInterviewConfirmedCandidates(decodedToken.companyId);
            console.log("Fetch response:", response.data); // Kiểm tra cấu trúc phản hồi
            if (response.data.isSuccess) { // Hoặc response.data.isSuccess tùy vào cấu trúc
                setInterviewConfirmedCandidates(response.data.data); // Hoặc response.data.data
            } else {
                message.error(response.message || 'Không thể lấy danh sách ứng viên chờ phỏng vấn.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ứng viên chờ phỏng vấn:', error);
            message.error('Lỗi khi lấy danh sách ứng viên chờ phỏng vấn.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleJoin = () => {
        if (!selectedCandidate || !decodedToken) {
            message.error("Không tìm thấy ứng viên hoặc công ty để tham gia phỏng vấn.");
            return;
        }

        const videoCallUrl = `http://localhost:5173/call/${selectedCandidate.user._id}/${decodedToken.companyId}`;

        window.open(videoCallUrl, '_blank');
        setIsModalVisible(false); // Đóng modal sau khi mở link
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <Spin />
            </div>
        );
    }

    if (!decodedToken) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-red-600 text-lg font-semibold">Truy cập không hợp lệ. Vui lòng đăng nhập.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-0">
            {interviewConfirmedCandidates.length === 0 ? (
                <div className="bg-white rounded-[4px] shadow-md p-6 text-center">
                    <p className="text-gray-600">Không có ứng viên nào đã xác nhận phỏng vấn.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-1">
                    {interviewConfirmedCandidates.map((candidate) => (
                        <div key={candidate.id} className="bg-white rounded-[4px] shadow-lg p-6 hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-[1.005] relative">
                            <div
                                className={`absolute top-4 right-4 text-white text-xs font-semibold px-2 py-1 rounded-full bg-green-500`}
                            >
                                {moment(candidate.interviewDate).format('DD/MM/YYYY HH:mm')}
                            </div>

                            <div className="flex items-center mb-4">
                                <img
                                    className="w-14 h-14 rounded-full object-cover border border-gray-600 p-1 mr-3"
                                    src={candidate.user.profilePictureUrl || '/default-avatar.png'} alt={`${candidate.user.firstName} ${candidate.user.lastName}`} />
                                <div>
                                    <p className="text-xl font-bold text-gray-800">{candidate.user.firstName} {candidate.user.lastName}</p>
                                    <p className="text-sm text-gray-500">{candidate.user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center mt-4">
                                <FaBriefcase className="text-gray-600 mr-2" />
                                <p className="text-gray-700 font-medium">{candidate.jobTitle || 'Chưa cập nhật'}</p>
                            </div>
                            {candidate.companyKey && (
                                <div className="mt-2">
                                    <p className="text-gray-700 flex items-center">
                                        <strong>Khóa truy cập:</strong>
                                        <span className='ml-2 bg-gray-300 p-1 font-semibold text-lg italic text-black'>
                                            {candidate.companyKey}
                                        </span>
                                    </p>
                                </div>
                            )}
                            <Button type="primary" className="bg-green-400 mt-6 w-fit text-white text-lg h-auto" onClick={() => showJoinModal(candidate)}>
                                Tham gia phòng họp
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                title="Tham gia phỏng vấn"
                open={isModalVisible}
                onOk={handleJoin}
                onCancel={() => setIsModalVisible(false)}
                okText="Tham gia"
                cancelText="Hủy bỏ"
                centered
                className="rounded-lg"
            >
                <p>Bạn có chắc chắn muốn tham gia buổi phỏng vấn này không?</p>
            </Modal>
        </div>
    );
};

export default WaitForInterview;

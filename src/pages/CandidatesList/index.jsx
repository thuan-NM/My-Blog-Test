import React, { useEffect, useState } from "react";
import jobstatusServices from "../../services/jobstatus.services";
import { message, Drawer, Modal, DatePicker } from "antd"; // Import Modal and DatePicker
import { Link, useParams } from "react-router-dom";
import postServices from "../../services/post.services";
import JobIntroduce from "../../components/JobIntroduce";
import { Dropdown, Space } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import moment from "moment";

const CandidateList = () => {
  const { postId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const candidatesResponse = await jobstatusServices.getCandidateOfJob(
          postId
        );
        const jobResponse = await postServices.getJobsWithId(postId);
        setJob(jobResponse.data);
        setCandidates(candidatesResponse.data);
      } catch (error) {
        message.error("Failed to load candidates.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCandidate();
  }, [postId, job]);

  if (isLoading) {
    return (
      <div className="process-comm">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );
  }

  const scheduleInterview = async (candidateId) => {
    try {
      const res = await jobstatusServices.requestConfirmation({
        postId,
        candidateId,
      });
      message.success(res.message);
    } catch (error) {
      message.error("Failed to send interview confirmation request");
    }
  };

  return (
    <div className="main-section mt-[20px]">
      <div className="container">
        <div className="main-section-data">
          <div className="row flex flex-row justify-center">
            <div className="col-lg-6 col-md-4 pd-left-none no-pd">
              {candidates.length === 0 ? (
                <div className="bg-white rounded shadow-md p-6 text-center">
                  <p>Chưa có ứng viên nào cho công việc này</p>
                </div>
              ) : (
                candidates.map((candidate) => {
                  const items = [
                    {
                      label: (
                        <button
                          className="!p-1 !px-6 text-md font-medium w-full"
                          onClick={() => scheduleInterview(candidate.user._id)} // Send interview confirmation request
                        >
                          Gửi yêu cầu xác nhận
                        </button>
                      ),
                      key: "0",
                    },
                    {
                      label: (
                        <button
                          className="!p-1 !px-6 text-md !text-black font-medium w-full"
                          onClick={() => denied(candidate.user._id)}
                        >
                          Từ chối
                        </button>
                      ),
                      key: "1",
                    },
                  ];
                  return (
                    <div className="bg-white px-4 pt-4 pb-2 mb-3 shadow-md" key={candidate.user._id}>
                      <div className="flex justify-between mb-8">
                        <Link
                          to={`/userprofile/${candidate.user._id}`}
                          className="flex items-center"
                        >
                          <img
                            src={
                              candidate.user.profilePictureUrl ||
                              `../images/userava.jpg`
                            }
                            width={55}
                            height={55}
                            alt="profile"
                            className="!mr-2 rounded-full"
                          />
                          <div className="!w-full font-medium flex flex-col ms-2">
                            <p className="text-xl font-bold">
                              {candidate.user.firstName}{" "}
                              {candidate.user.lastName}
                            </p>
                            <p className="flex w-full text-neutral-500 !text-md">
                              {candidate.user.email}
                            </p>
                          </div>
                        </Link>
                        <div className="flex items-center">
                          <Dropdown menu={{ items }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                <BarsOutlined className="text-xl text-black" />
                              </Space>
                            </a>
                          </Dropdown>
                        </div>
                      </div>
                      <hr className="!border !border-neutral-400" />
                      <div>
                        <p className="font-bold mb-2">
                          Lời giới thiệu:
                        </p>
                        <p className="ml-4">- {candidate.coverLetter}</p>
                        <hr className="!border !border-neutral-400" />
                        <div className="flex justify-end">
                          <p>
                            <Link
                              to={candidate.cv}
                              target="_blank"
                              className="clrbtn mt-2 !underline hover:!underline hover:!text-neutral-400 text-black"
                            >
                              Xem CV ứng viên
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="col-lg-4 pd-right-none no-pd">
              <JobIntroduce job={job} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;

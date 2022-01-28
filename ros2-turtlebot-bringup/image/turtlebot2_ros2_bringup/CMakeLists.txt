cmake_minimum_required(VERSION 3.5)
project(turtlebot2_ros2_bringup)

find_package(ament_cmake REQUIRED)

install(
  DIRECTORY 
  launch 
  config 
  DESTINATION share/${PROJECT_NAME}
)

ament_package()

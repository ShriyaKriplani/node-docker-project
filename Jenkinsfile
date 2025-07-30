pipeline {
    agent any

    stages {
       
        stage('Build Docker Image')
            {steps {
                script {
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
            }

        stage('Run Docker Container')
            {steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
            }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
    }
}
'use client'

import { emitter } from '@/core'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { projectsApi } from '@/api/projects'

const THUMBNAIL_WIDTH = 1920
const THUMBNAIL_HEIGHT = 1080

interface ThumbnailGeneratorProps {
  projectId?: string
}

export const ThumbnailGenerator = ({ projectId: propProjectId }: ThumbnailGeneratorProps) => {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const camera = useThree((state) => state.camera)
  const isGenerating = useRef(false)

  // Use prop projectId (from URL)
  const fallbackProjectId = propProjectId

  useEffect(() => {
    const handleGenerateThumbnail = async (event: { projectId: string }) => {
      if (isGenerating.current) {
        console.log('⏸️ Thumbnail generation already in progress')
        return
      }

      // Prioritize prop projectId over event projectId (URL has priority over session)
      const projectId = fallbackProjectId || event.projectId

      if (!projectId) {
        console.error('❌ No project ID provided')
        return
      }

      isGenerating.current = true
      console.log('📸 Generating thumbnail for project:', projectId)

      try {
        // Save current renderer state
        const currentSize = gl.getSize(new THREE.Vector2())
        const currentPixelRatio = gl.getPixelRatio()

        // Temporarily resize renderer to thumbnail size
        gl.setPixelRatio(1)
        gl.setSize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT)

        // Update camera aspect ratio if it's a perspective camera
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.aspect = THUMBNAIL_WIDTH / THUMBNAIL_HEIGHT
          camera.updateProjectionMatrix()
        }

        // Render the scene
        gl.render(scene, camera)

        // Wait a frame to ensure render is complete
        await new Promise((resolve) => requestAnimationFrame(resolve))

        // Capture canvas as blob
        const canvas = gl.domElement
        canvas.toBlob(async (blob) => {
          if (blob) {
            // Upload to Supabase Storage
            console.log('☁️ Uploading thumbnail to storage...')
            // Upload to backend
            console.log('☁️ Uploading thumbnail to storage...')
            try {
              await projectsApi.uploadThumbnail(projectId, blob)
              console.log('✅ Thumbnail uploaded successfully!')
            } catch (error) {
              console.error('❌ Failed to upload thumbnail:', error)
            }
          } else {
            console.error('❌ Failed to create blob from canvas')
          }

          // Restore renderer size and camera
          gl.setPixelRatio(currentPixelRatio)
          gl.setSize(currentSize.x, currentSize.y)

          if (camera instanceof THREE.PerspectiveCamera) {
            camera.aspect = currentSize.x / currentSize.y
            camera.updateProjectionMatrix()
          }

          isGenerating.current = false
        }, 'image/png')
      } catch (error) {
        console.error('❌ Failed to generate thumbnail:', error)

        // Make sure to restore size even on error
        const currentSize = gl.getSize(new THREE.Vector2())
        const currentPixelRatio = gl.getPixelRatio()
        gl.setPixelRatio(currentPixelRatio)
        gl.setSize(currentSize.x, currentSize.y)

        if (camera instanceof THREE.PerspectiveCamera) {
          camera.aspect = currentSize.x / currentSize.y
          camera.updateProjectionMatrix()
        }

        isGenerating.current = false
      }
    }

    emitter.on('camera-controls:generate-thumbnail', handleGenerateThumbnail)

    return () => {
      emitter.off('camera-controls:generate-thumbnail', handleGenerateThumbnail)
    }
  }, [gl, scene, camera, fallbackProjectId])

  return null
}
